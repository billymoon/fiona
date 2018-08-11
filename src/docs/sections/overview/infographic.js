import { fiona, consume } from '../../app'

// const script = `

// Maybe you could have a video
// on the examples page perhaps

//     But what is in the video
//     would I have to have music?

// Hey man, we have designs
// for the new product thing...

//     How many pixels wide does
//     it have to be?

// I dunno, I kind of feel
// like I need to see it first

//     How can I make it if you
//     wont tell me how big?

// `.split('\n').map(i => i.trim()).filter(i => !!i)

const script = `

If I had real data I could
make a better design

    How about realistic data
    would that work for you?

Sure, but where do I get
realistic data from?

    I can help you, and Fiona
    can help me :)

`.split('\n').map(i => i.trim()).filter(i => !!i)

// https://thenounproject.com/search/?q=head&i=1338838
// https://thenounproject.com/search/?q=code&i=365319
const Section = ({ theme, chatter }) =>
  <section>
    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 530 140">
      <path d="M54.018 78.024v.002c-.354-.01-21.969-.004-21.969-.004h-.024l-.024.002C16.657 78.024 0 92.3 0 109.122v8.593h87.593v-8.594c-.001-19.12-18.574-31.097-33.575-31.097zm-32.113 37.2v-11.328h-1.533v11.328H2.49v-6.103c0-13.045 12.638-28.38 30.818-28.604l3.371 34.706H21.905zm16.342 0l-2.962-34.711H52.3l-2.956 34.711H38.247zm46.853 0H67.217v-11.328h-1.533v11.328H50.912s3.401-34.613 3.366-34.706c16.461.191 30.822 13.474 30.822 28.604v6.102zM34.775 73.178l.867 3.654h16.335l.864-3.645c6.506-2.852 7.338-9.278 7.338-13.056 0-2.95 7.039-8.01 7.039-19.006.001-12.908-10.5-23.41-23.407-23.41-12.909 0-23.411 10.502-23.411 23.41 0 10.58 7.04 16.593 7.04 19.015 0 3.948 1.171 10.214 7.335 13.038zm15.939-1.818l-.706 2.981H37.611l-.707-2.981c-1.17-.695-6.969-1.585-6.969-11.19h27.738c-.003.08-.002.152.01 0 .001 4.974-1.408 9.03-6.969 11.19zm-6.903-51.154c11.533.001 20.916 9.385 20.916 20.919 0 10.278-4.793 11.468-6.731 17.512H44.562v-8.914l10.137-8.319-.972-1.186-9.924 8.133-9.909-8.133-.974 1.185 10.108 8.308v8.926H29.625c-1.525-4.556-6.733-7.914-6.733-17.512 0-11.534 9.384-20.918 20.919-20.919zM461.429 29.272c-2.609 0-4.751 2.142-4.751 4.75V63.88c0 2.608 2.142 4.75 4.751 4.75h16.625l-3.541 6.087a1.355 1.355 0 0 0 1.166 2.057h20.358a1.358 1.358 0 0 0 1.166-2.057l-3.541-6.087h16.625c2.608 0 4.75-2.142 4.75-4.75V34.022c0-2.608-2.142-4.75-4.75-4.75h-48.858zm0 2.714h48.858c1.152 0 2.036.885 2.036 2.036V63.88a2.002 2.002 0 0 1-2.036 2.036h-48.858a2.002 2.002 0 0 1-2.036-2.036V34.022c0-1.151.884-2.036 2.036-2.036zm27.801 6.744a1.385 1.385 0 0 0-.17.021 1.358 1.358 0 0 0-1.082.891l-6.785 17.643a1.363 1.363 0 0 0 2.544.976l6.786-17.644a1.357 1.357 0 0 0-1.293-1.887zm-11.642 3.414a1.35 1.35 0 0 0-.488.149l-10.858 5.428a1.36 1.36 0 0 0 0 2.439l10.858 5.429a1.366 1.366 0 0 0 1.23-2.439l-8.419-4.199 8.419-4.22a1.357 1.357 0 0 0-.615-2.587 1.345 1.345 0 0 0-.127 0zm16.243 0a1.356 1.356 0 0 0-.445 2.587l8.419 4.22-8.419 4.199a1.365 1.365 0 0 0 1.23 2.439l10.857-5.429a1.358 1.358 0 0 0 0-2.439l-10.857-5.428a1.362 1.362 0 0 0-.657-.149 1.366 1.366 0 0 0-.128 0zM481.193 68.63h9.33l3.16 5.429h-15.65l3.16-5.429zm-5.824 11.887l8.603 10.512-5.232 24.194h-14.774v-11.327h-1.533v11.328h-17.882v-6.103c0-13.045 12.638-28.38 30.818-28.604zm18.992-.004l-8.275 10.117 5.319 24.594h-11.097l5.318-24.594-8.28-10.117h17.015zm1.978.005c16.462.191 30.822 13.474 30.822 28.604v6.102h-17.883v-11.328h-1.533v11.328h-14.772l-5.232-24.195 8.598-10.511zm-9.342-2.498c-4.304 0-8.607 0-12.911.002l-.024.002c-15.344 0-32.001 14.276-32.001 31.098v8.593h87.593v-8.594c-.001-19.12-18.574-31.097-33.575-31.097v.002c-3.027-.017-6.055.004-9.082-.006z"/>
      <g>
        <path d="M201.765 129.641c-6.627 0-12-5.373-12-12V89.299c0-6.628 5.373-12 12-12h170.018l26.04-22.955-8.392 22.955h20.966c6.628 0 12 5.372 12 12v28.342c0 6.627-5.372 12-12 12H201.765z" strokeWidth="3" />
        <path d="M305.438 5.5c6.627 0 12 5.373 12 12v28.342c0 6.628-5.373 12.001-12 12.001l-170.019-.001-26.039 22.955 8.392-22.955H96.805c-6.627.001-12-5.372-12-11.999V17.5c0-6.627 5.373-12 12-12h208.633z" strokeWidth="3" />
      </g>
      <text x="96" y="27" className="design-1">{chatter[0]}</text>
      <text x="96" y="48" className="design-2">{chatter[1]}</text>
      <text x="200" y="100" className="develop-1">{chatter[2]}</text>
      <text x="200" y="120" className="develop-2">{chatter[3]}</text>
    </svg>
    <style jsx>{`
      text {
        font-size: 14px;
        width: 20px;
      }

      svg path {
        fill: ${theme.clr.primary};
        stroke: none;
      }

      svg g path {
        fill: ${theme.clr.white};
        stroke: ${theme.clr.secondary};
      }

      section {
        margin-top: 20px;
        position: relative;
      }
      @media screen and (min-width: 768px) {
        section {
          margin-top: 50px;
          margin-bottom: 50px;
        }
      }
    `}</style>
  </section>


class SmartSection extends React.Component {
  componentWillMount () {
    const updateChatter = () => {
      const start = this.currentChat % script.length
      const [one, two, three, four] = script.concat(script).slice(start, start + 4)
      this.currentChat += 2

      this.props.setChatter(this.currentChat % 4 === 0 ? [three, four, one, two] : [one, two, three, four])
    }

    setTimeout(() => {
      this.interval = setInterval(updateChatter, 3000)
    }, 5000)

    updateChatter()
  }
  
  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return <Section {...this.props} />
  }

  interval = null
  currentChat = 0
}

export default consume(SmartSection)
