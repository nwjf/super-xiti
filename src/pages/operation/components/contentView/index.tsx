/**
 * 内容视图
 */

import PageView from '../pageView';
import ContentPage from './contentPage';

export default function ContentView() {
  return <div className="operation-content-view">
    <PageView>
      <ContentPage />
    </PageView>
  </div>
}