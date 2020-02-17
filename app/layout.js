const Layout = ({ data, children, ...props }) => {
  // console.log(data)
  return (
    <Fragment>
      <header>{data.map((item, index) => <div key={index.toString()}>{item.title}</div>)}</header>
      <main className={css.main}>{children}</main>
      <footer>footer</footer>
    </Fragment>
  );
};

export default Layout;
