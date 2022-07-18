import styled from "styled-components";

interface IInputWrapper {
    width?: number
    size: 'small' | 'medium' | 'large'
    hasError: boolean
}

export const InputWrapper = styled.div<IInputWrapper>`
  display: inline-block;
  width: ${({width}) => width ? `${width}px` : '100%'};
  h5 {
    margin: 0 0 5px 7px;
    transition: .3s;
    color: var(--clr-red);
    opacity:  ${({hasError}) => hasError ? 1 : 0};
    font-weight: var(--fnt-reg);
    font-size: var(--fnt-size-sml);
  }
  label {
    width: 100%;
    position: relative;
    display: inline-block;
    height: ${({size}) => {
    switch (size) {
        case 'large':
            return "60px"
        case 'medium':
            return  "50px"
        case 'small':
            return "40px"
    }
}};
  }
 
  img {
    width: auto;
    height: 70%;
    transition: .2s;
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
  }
`