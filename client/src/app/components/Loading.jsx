import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import Spin from 'antd/es/spin';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const LoadingIndicator = (): JSX.Element => <Spin indicator={antIcon} />;
export default LoadingIndicator;
