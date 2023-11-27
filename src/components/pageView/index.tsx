/**
 * page view
 */
import { useState, ReactElement, CSSProperties } from 'react';
import Page from './page';
import './index.less';

interface Props {
  currentPage?: number;
  offsetTop?: number;
  children?: ReactElement;
  style?: CSSProperties;
};

export default function PageView(props: Props) {
  // 是否展示下一页
  const [isShowNextPage, setIsShowNextPage] = useState<boolean>(false);
  // 当前页码
  const [currentPage, setCurrentPage] = useState<number>(props.currentPage || 1);
  // 下个页面的上偏移量
  const [nextOffsetTop, setNextOffsetTop] = useState<number>(0);

  const ContentBox = <>
    <Page
      currentPage={currentPage}
      offsetTop={props.offsetTop || 0}
      setIsShowNextPage={setIsShowNextPage}
      setNextOffsetTop={setNextOffsetTop}
    >
      { props.children }
    </Page>
    {
      isShowNextPage
        ? <PageView
            currentPage={currentPage + 1}
            offsetTop={nextOffsetTop}
          >
            { props.children }
          </PageView>
        : null
    }
  </>;

  if (currentPage <= 1) {
    return (
      <div className="page-view-warp" style={props.style}>
        { ContentBox }
      </div>
    );
  } else {
    return ContentBox;
  }
}