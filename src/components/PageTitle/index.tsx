import React from 'react';
interface IProps {
  title: string;
}
const PageTitle = (props: IProps) => {
  const { title } = props || {};
  return <h2>{title || ''}</h2>;
};
export default PageTitle;
