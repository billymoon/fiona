import S from "@sanity/desk-tool/structure-builder";
import React from "react";

function JSONpreview({ options, document }) {
  const { displayed } = document;
  const { indentation = 2 } = options;
  const JSONstring = JSON.stringify(displayed, null, indentation);

  // return <pre>{JSONstring}</pre>;
  return (
    <section style={{ margin: 16 }}>
      <h3>{displayed.title}</h3>
      {displayed.shelves && displayed.shelves.map(shelf => (
        <pre>
          <code>{JSON.stringify(shelf.content, null, 2)}</code>
        </pre>
      ))}
    </section>
  );
}

// // Hide document types that we already have a structure definition for
// const hiddenDocTypes = listItem =>
//   !['category', 'person', 'sampleProject', 'siteSettings', 'ad'].includes(listItem.getId())

export default () =>
  S.list()
    .title("Content")
    .items([
      // siteSettings,
      // projects,
      // person,
      // ads,
      // categories,
      ...S.documentTypeListItems() //.filter(hiddenDocTypes)
    ]);

export const getDefaultDocumentNode = props => {
  return S.document().views([
    S.view.form(),
    S.view.component(JSONpreview).title("JSON")
  ]);
};
