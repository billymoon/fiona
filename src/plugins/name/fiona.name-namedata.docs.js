import { injectState, ApiSection } from '../../docs/app'
import { Sample } from 'jsx-components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.</small>namedata</span>}>
    <p>the data used to generate names and salutations is exposed as `fiona.namedata` shich can be inspected, and modified.</p>

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
  </ApiSection>

export default injectState(Section)
