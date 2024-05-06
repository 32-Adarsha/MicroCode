import { Layout, List, Card, Button } from 'antd';

const ExamPage = () => {
  return (
    <Layout>
      <Layout.Content
        style={{
          padding: '50px',
          backgroundColor: '#fff',
          minHeight: 280,
        }}
      >
        <Card title="Exam Page" bordered={false}>
          <List
            header={<div>Exam List 1</div>}
            footer={<Button type="primary">View More</Button>}
            bordered
            dataSource={["examList1"]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.name} description={item.description} />
              </List.Item>
            )}
          />
          <List
            header={<div>Exam List 2</div>}
            footer={<Button type="primary">View More</Button>}
            bordered
            dataSource={["examList2"]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.name} description={item.description} />
              </List.Item>
            )}
          />
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default ExamPage;