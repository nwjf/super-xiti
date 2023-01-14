import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './router';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';

import './style/common.less';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RecoilRoot>
      <DebugObserver />
      <Router />
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.group();
    console.info("The following atoms were modified:");
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.info(node.key, snapshot.getLoadable(node).contents);
    }
    console.groupEnd();
  }, [snapshot]);

  return null;
}
