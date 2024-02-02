// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.less'
// const App = () => {
//   return (
//     <div>
//     <h1>page3</h1>
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));
const { createHashHistory } = require("history");

import './styles/index.less';
import dva from 'dva';
// import { receiveMessageFromHonghu } from '@/utils/receiveFromHonghu';
import addModels from './models';
import router from './router';
import './styles/global.less';
const history = createHashHistory();
console.log('wbp5');
// receiveMessageFromHonghu();
const initialState = { history };

const app = dva({
  history,
  // initialState,
});

addModels(app);
app.router(require('./router').default);
// app.router(router);

app.start('#root');
