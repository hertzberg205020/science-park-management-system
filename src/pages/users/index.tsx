import { Button, Card, Col, Input, Pagination, Row, Table, type PaginationProps, type TableProps } from 'antd';
import type { CompanyDataType } from './interface';
import { useCallback, useEffect, useState } from 'react';
import { getClientList } from '@/api/client-list';


const columns: TableProps<CompanyDataType>['columns'] = [
  {
    title: 'No.',
    key: 'index',
    align: 'center',
    width: 25,
    render(_value: string, _record: CompanyDataType, index: number) {
      return index + 1;
    }
  },
  {
    title: 'Enterprise',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 100,
  },
  {
    title: 'Contact',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
    width: 175,
  },
  {
    title: 'Industry Category',
    dataIndex: 'industryCategory',
    key: 'industryCategory',
    align: 'center',
    width: 175,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    width: 100,
  },
  {
    title: 'Unified Business Number',
    dataIndex: 'unifiedBusinessNumber',
    key: 'unifiedBusinessNumber',
    align: 'center',
    width: 120,
  },
  {
    title: 'Industry Code',
    dataIndex: 'industryCode',
    key: 'industryCode',
    align: 'center',
    width: 100,
  },
  {
    title: 'Responsible Person',
    dataIndex: 'responsiblePerson',
    key: 'responsiblePerson',
    align: 'center',
    width: 100,
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: () => {
      return (
        <>
          <Button type='primary' size='small'>Edit</Button>
          <Button type='primary' size='small' danger className='ml'>Delete</Button>
        </>
      );
    }
  }
];

interface searchType {
  name: string;
  phone: string;
  contact: string;
}


const Users: React.FC = () => {
  const [dataList, setDataList] = useState<CompanyDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchOpt, setSearchOpt] = useState<searchType>({
    name: '',
    phone: '',
    contact: ''
  });
  const [total, setTotal] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchOpt((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  }

  const loadData = useCallback(async () => {
    // 模擬 API 請求
    try {
      setLoading(true);
      const { data: { list, total } } = await getClientList({
        ...searchOpt,
        page,
        pageSize
      });
      setLoading(false);

      setTotal(total);

      setDataList(list);
    }
    catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  }, [page, pageSize, searchOpt]);

  useEffect(() => { loadData(); }, [loadData, page, pageSize]);

  return (
    <div className='users'>
      <Card className='search'>
        <Row gutter={16}>
          <Col span={7}>
            <span>Enterprise</span>
            <Input name='name' value={searchOpt.name} onChange={handleSearchChange} />
          </Col>
          <Col span={7}>
            <span>Contact</span>
            <Input name='contact' value={searchOpt.contact} onChange={handleSearchChange} />
          </Col>
          <Col span={7}>
            <span>Phone</span>
            <Input name='phone' value={searchOpt.phone} onChange={handleSearchChange} />
          </Col>
          <Col span={3} style={{ paddingLeft: '30px' }}>
            <Button type='primary' style={{ marginRight: '8px' }}>Search</Button>
            <Button className='ml'>Reset</Button>
          </Col>
        </Row>
      </Card>
      <Card className='mt tr'>
        <Button type='primary' >New Enterprise</Button>
        <Button danger type='primary' className='ml'>Batch Delete</Button>
      </Card>
      <Card className='mt'>
        <Table
          columns={columns}
          dataSource={dataList}
          loading={loading}
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          pagination={false}
        />
        <Pagination
          className="fr mt"
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={handlePageChange}
        />
      </Card>

    </div>
  );
};

export default Users;
