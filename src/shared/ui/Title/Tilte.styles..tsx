import styled, {css} from "styled-components";

interface ITitleWrapper {
    size?: number
    weight?: 'bold' | 'semi-bold' | 'medium' | 'regular'
    loading: boolean
}

export const TitleWrapper = styled.label<ITitleWrapper>`
  padding: 0;
  display: flex;
  align-items: center;
  margin: 0;
  line-height: 1em;
  min-width: 1px;
  ${props => props.loading && css`
    width: 70%;
  `} 
  
  h1, h2, h3, h4, h5, h6 {
    font-size: ${props => props.size}px;
    font-weight: ${({weight}) => {
      switch (weight){
        case 'bold':
          return 'var(--fnt-bold)'
        case 'semi-bold':
          return 'var(--fnt-sb)'
        case 'medium':
          return 'var(--fnt-med)'
        case 'regular':
          return 'var(--fnt-reg)'
      }
    }};
  }

`