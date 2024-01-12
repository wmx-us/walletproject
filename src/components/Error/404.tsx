import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
// import { HOME_URL } from "@/config/config";
import "./index.scoped.css";

const NotFound = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate("/");
	};
	return (
		<Result
			status="404"
			title="404"
			subTitle="对不起，您访问的页面不存在！"
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotFound;