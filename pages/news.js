import { GlobalStateFactory, GlobalStateContext, injectGlobalState } from '../src/docs/app/newstate'

const GlobalState = GlobalStateFactory({ awesome: 'totally', suerpcool: 'yeah baby' })

const Theme = {
  Default: GlobalStateFactory({ theme: {
    bg: 'yellow',
    fg: 'blue'
  } }),
  Red: GlobalStateFactory({ theme: {
    bg: 'red',
    fg: 'white'
  } }),
  Black: GlobalStateFactory({ theme: {
    bg: 'black',
    fg: 'white'
  } }),
  Gold: GlobalStateFactory({ theme: {
    fg: 'gold'
  } })
}

const Ting = injectGlobalState(({ theme, children }) =>
  <div>
    {children}
    <style jsx>{`
      background: ${theme.bg};
      color: ${theme.fg};
    `}</style>
  </div>
)

let update = () => {}

// if(typeof window !== 'undefined'){ window.Theme = Theme}

class Page extends React.Component {
  render () {
    return <div>
      <Theme.Red>
        <Ting><p>In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
        <p onClick={() => this.removeThing()}>In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p>
        {this.state.showlast && <Theme.Gold><Ting><div>cool</div></Ting></Theme.Gold>}
        <Theme.Gold>
          <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
        </Theme.Gold>
        <Theme.Black>
          <Ting><p onClick={() => Theme.Gold.update({ theme: { bg: 'blue', fg: 'white' } })}>... In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
        </Theme.Black>
        {Theme.Gold.update({ theme: { bg: 'blue', fg: 'silver' } })}
        <Theme.Gold>
          <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
        </Theme.Gold>
        <Theme.Gold>
          <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
        </Theme.Gold>
        <Theme.Black>
          <Ting><p onClick={() => Theme.Gold.update({ theme: { bg: 'blue', fg: 'white' } })}>... In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
        </Theme.Black>
      </Theme.Red>
    </div>    
  }

  removeThing () {
    this.setState({ showlast: false })
  }

  state = {
    showlast: true
  }
}

// class Page extends React.Component {
//   render () {
//     return <Theme.Default>
//       <Ting><p onClick={() => this.removeThing()}>In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//       <Theme.Red>
//         <Ting><p>In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//         <Theme.Gold>
//           <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//         </Theme.Gold>
//         <Theme.Black>
//           <Ting><p onClick={() => Theme.Gold.update({ theme: { bg: 'blue', fg: 'white' } })}>... In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//         </Theme.Black>
//         {Theme.Gold.update({ theme: { bg: 'blue', fg: 'silver' } })}
//         <Theme.Gold>
//           <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//         </Theme.Gold>
//         {this.state.showlast && <Theme.Gold>
//           <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//         </Theme.Gold>}
//         <Theme.Gold>
//           <Ting><p>5 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//         </Theme.Gold>
//         <Ting><p>6 In duis aliquip elit in enim et aliqua velit reprehenderit ut labore sint proident ut enim ut.</p></Ting>
//       </Theme.Red>
//     </Theme.Default>    
//   }

//   removeThing () {
//     this.setState({ showlast: true })
//   }

//   state = {
//     showlast: true
//   }
// }

export default Page
