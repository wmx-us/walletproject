import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
// import { HOME_URL } from "@/config/config";
import "./index.scoped.css";

const NotNetwork = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate("/");
	};
	return (
		<Result
			status="500"
			title="500"
			subTitle="对不起，出了点问题！"
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotNetwork;