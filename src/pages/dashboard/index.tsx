import { Card, Col, Row } from 'antd';
import { icons } from './icons';
import './index.scss'
import EnergyFigure from './EnergyFigure';
import BarFigure from './BarFigure';

interface CardInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const cardData: CardInfo[] = [
  {
    title: '13479',
    description: '園區總面積(平方公尺)',
    icon: icons.RadarChartOutlined,
  },
  {
    title: '8635',
    description: '總租賃面積(平方公尺)',
    icon: icons.SnippetsOutlined,
  },
  {
    title: '38764',
    description: '園區總產值(萬元新台幣)',
    icon: icons.DollarOutlined,
  },
  {
    title: '2874',
    description: '入駐企業數量(家)',
    icon: icons.LaptopOutlined,
  },
];

const generateCards = (data: CardInfo[]) => {
  return data.map((item, index) => (
    <Col span={6} key={index}>
      <Card className="clearfix">
        <div className="fl area">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div className="fr">
          {item.icon}
        </div>
      </Card>
    </Col>
  ));
}

const Dashboard: React.FC = () => {


  return (
    <div className='dashboard'>
      <Row gutter={16}>
        {generateCards(cardData)}
      </Row>
      <Row gutter={16} className='mt'>
        <Col span={12}>
          <Card title="園區能耗概況" className='card'>
            <EnergyFigure />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="園區產值概況" className='card'>
            <BarFigure />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
