import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const originalNameData = JSON.parse(JSON.stringify(fiona.namedata))

const customNamaData = () => {
  Object.assign(fiona.namedata, {
    male: {
      firstname: ['Austin', 'Ambrose', 'Andre', 'Arturo'],
      title: ['Lord', 'Baron', 'Count']
    },
    female: {
      firstname: ['Antonietta', 'Antonina', 'Marian', 'Antonetta'],
      title: ['Madam', 'Madame', 'Maid']
    }
  })
}

const defaultNamaData = () => {
  Object.assign(fiona.namedata, {
    male: originalNameData.male,
    female: originalNameData.female
  })
}

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>namedata</span>}>
    <p>The data used to generate names and salutations is exposed as <code>fiona.namedata</code> which can be inspected, and modified. The data is based on Scottish census records and is structured like this sample:</p>

    <Sample>{`
    fiona.namedata = {
      male: {
        firstname: ['Jack', 'James', /* etc... */ 'Hunter', 'Zachary'],
        title: ['Mr', 'Dr', 'Sir', 'Lord']
      },
      female: {
        firstname: ['Fiona', 'Aria', 'Mia', /* etc... */ 'Matilda', 'Lauren'],
        title: ['Miss', 'Mrs', 'Dr', 'Ms', 'Dame']
      },
      lastname: ['Moon', 'Smith', 'Brown', /* etc... */ 'Mitchell', 'Fraser']
    }
    `}</Sample>

    <p>To change the namedata, you can assign new values to the properties of <code>fiona.namedata</code> but not the object itself.</p>

    <Sample input={`
    fiona(${seed}).fullname()

    Object.assign(fiona.namedata, {
      male: {
        firstname: ['Austin', 'Ambrose', 'Andre', 'Arturo'],
        title: ['Lord', 'Baron', 'Count']
      },
      female: {
        firstname: ['Antonietta', 'Antonina', 'Marian', 'Antonetta'],
        title: ['Madam', 'Madame', 'Maid']
      }
    })

    fiona(${seed}).fullname()
    `} output={`
    ${fiona(seed).fullname()}
    ${customNamaData() || ''}${fiona(seed).fullname()}${defaultNamaData() || ''}
    `} />
  </ApiSection>

export default consume(Section)
