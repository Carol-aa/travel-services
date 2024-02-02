import React from 'react';

const SRC = 'https://qingfeng.didiglobal.com/qf-web/pigReportContent?channelType';

const Report = () => {
  return (
    <iframe className="doc-style" src={SRC} title="我要举报" allowFullScreen />
  );
};

export default Report;
