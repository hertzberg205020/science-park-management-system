import { Button, Card, Col, Input, Row, Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

<Table dataSource={dataSource} columns={columns} />;

const Users: React.FC = () => {
  return (
    <div className='users'>
      <Card className='search'>
        <Row gutter={16}>
          <Col span={7}>
            <span>Enterprise</span>
            <Input></Input>
          </Col>
          <Col span={7}>
            <span>Contact</span>
            <Input></Input>
          </Col>
          <Col span={7}>
            <span>Phone</span>
            <Input></Input>
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
      <Card>
        <Table columns={columns} dataSource={dataSource}></Table>
      </Card>
    </div>
  );
};

export default Users;
