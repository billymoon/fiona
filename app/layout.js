const Layout = ({ pageTitle, children, ...props }) => (
  <Fragment>
    <header>
      <h1>{pageTitle}</h1>
      <nav>
        <a href="/">Overview</a>
        <a href="/api">Api</a>
        <a href="/examples">Examples</a>
      </nav>
    </header>
    <main className={css.main}>
      <article>{children}</article>
    </main>
    <footer>Footer</footer>
  </Fragment>
);

export default Layout;
