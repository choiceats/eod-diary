import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('./services/diaryApi')

configure({ adapter: new Adapter() })
