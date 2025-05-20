import { Button, Card, Col, Input, Row, Table, type TableProps } from 'antd';
import type { CompanyDataType } from './interface';
import { useCallback, useEffect, useState } from 'react';
import { getClientList } from '@/api/client-list';


const columns: TableProps<CompanyDataType>['columns'] = [
  {
    title: 'Enterprise',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: 'Contact',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
  },
  {
    title: 'Industry Category',
    dataIndex: 'industryCategory',
    key: 'industryCategory',
    align: 'center',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
  },
  {
    title: 'Unified Business Number',
    dataIndex: 'unifiedBusinessNumber',
    key: 'unifiedBusinessNumber',
    align: 'center',
  },
  {
    title: 'Industry Code',
    dataIndex: 'industryCode',
    key: 'industryCode',
    align: 'center',
  },
  {
    title: 'Responsible Person',
    dataIndex: 'responsiblePerson',
    key: 'responsiblePerson',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
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

  useEffect(() => { loadData(); }, [loadData]);

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
        />
      </Card>
    </div>
  );
};

export default Users;
