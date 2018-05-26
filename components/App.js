import {connect} from 'react-redux'
import Form from './Form'
import List from './List'
import Abstract from './Abstract'
import styled from 'styled-components'

const App = ({ loading }) => {
  console.log(loading)
  return (
    <div>
      {loading ? <Loading>Loading...</Loading> : null}
      <Wrapper>
        <h1>Abstract Search</h1>
        <p>論文のAbstractを探して日本語訳するサービスです</p>
        <Form />
        <List />
        <Abstract />
      </Wrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.loading
})

const Wrapper = styled.div`
  width: 70%;
  margin: 0px auto;
  color: #666;
  h1 {
    margin: 0;
    padding: 5px;
    text-align: center;
  }
  p {
    text-align: center;
  }
`;

const Loading = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
`;

const H1 = styled.h1`
`;

export default connect(mapStateToProps)(App)
