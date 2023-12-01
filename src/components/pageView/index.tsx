/**
 * page view
 */
import { useState, ReactElement, CSSProperties, useEffect } from 'react';
import Page from './page';
import './index.less';
import { useWindowSize } from 'react-use';
import { useGetPagerConfigState } from '../../atoms/pagerConfigState';

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

  // const { width, height } = useWindowSize();

  const { scale } = useGetPagerConfigState();

  // const [scale, setScale] = useState<number>(1);

  // useEffect(() => {
  //   console.log(width, pagerConfig.width);
  //   if (width > pagerConfig.width) {
  //     setScale(1);
  //   } else {
  //     setScale(pagerConfig.width / width);
  //   }
  // }, [width, pagerConfig.width]);


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
        <div style={{ transform: `scale(${scale})`}}>
          { ContentBox }
        </div>
      </div>
    );
  } else {
    return ContentBox;
  }
}