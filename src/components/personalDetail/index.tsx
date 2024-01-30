/**
 * 页面标题，用户信息填写模块
 */
import './index.less';
import { useGetPagerConfigState } from '../../atoms/pagerConfigState';

export default function PersonalDetail() {
  const { title } = useGetPagerConfigState();

  return (
    <div className="personal-detail-wrap">
      <div className="title">
        { title || '超级习题' }
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