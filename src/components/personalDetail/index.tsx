/**
 * 页面标题，用户信息填写模块
 */
import './index.less';

export default function PersonalDetail() {
  return (
    <div className="personal-detail-wrap">
      <div className="title">
        练习题
        <span></span>
      </div>
      <div className="info">
        <div className="info-menu">班级：___________</div>
        <div className="info-menu">姓名：___________</div>
        <div className="info-menu">日期：___________</div>
        <div className="info-menu">得分：___________</div>
      </div>
    </div>
  );
}