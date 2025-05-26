import { getData } from '@/api/tenement';
import type { TenementDataType } from '@/types/tenement';
import { Button, Card, Col, Input, message, Popconfirm, Row, Table, type TableProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import columns from './columns';

const Tenement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState<TenementDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const onEdit = (record: TenementDataType) => {
    console.log('Edit record:', record);
    // Implement edit logic here
  };
  const handleDelete = async (id: string | number) => {
    console.log('Delete record with id:', id);
    // Implement delete logic here
  }

  const tableColumns: TableProps<TenementDataType>['columns'] = useMemo(() => {
    return columns?.map(col => {
      if (col.key === 'action') {
        return {
          ...col,
          render(_value, record) {
            return (
              <>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => onEdit(record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete Item"
                  description="Are you sure to delete this item?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDelete(record.id)}
                  onCancel={() => message.info('Delete cancelled')}
                >
                  <Button type="primary" size="small" danger className="ml">
                    Delete
                  </Button>
                </Popconfirm>
              </>
            )
          }
        };
      }
      return col;
    })
  }
    , []);

  // 分頁改變時的處理函數
  const handleTableChange: TableProps<TenementDataType>['onChange'] = (pagination) => {
    if (pagination.current) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize) {
      setCurrentPageSize(pagination.pageSize);
    }
  };



  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { data, total } = await getData({ page: currentPage, pageSize: currentPageSize });
        setData(data);
        setTotalRecords(total);
      } catch (error) {
        console.error('Error loading data:', error);
        message.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentPage, currentPageSize]);

  return (
    <div>
      <Card className="search">
        <Row gutter={16}>
          <Col span={4}>
            <span>大樓名稱</span>
            <Input></Input>
          </Col>
          <Col span={4}>
            <span>負責人</span>
            <Input></Input>
          </Col>
          <Col span={4}>
            <Button className="mr" type="primary">查詢</Button>
            <Button>Reset</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Table
          columns={tableColumns}
          dataSource={data}
          rowKey={(record) => record.id}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: currentPageSize,
            total: totalRecords,
            showSizeChanger: true, // 允許改變 pageSize
            pageSizeOptions: ['10', '20', '50', '100'], // 可選的 pageSize
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // 顯示總數
            // onChange 已被 Table 的 onChange 包含，Table 的 onChange 會提供 pagination, filters, sorter
            // 如果只需要 pagination 的變化，可以直接使用 Table 的 onChange
          }}
          onChange={handleTableChange} // Table 的 onChange 會處理分頁、排序、篩選的變化
        />
      </Card>
    </div>
  );
};

export default Tenement;
