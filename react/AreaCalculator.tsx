import { useCssHandles } from 'vtex.css-handles';
import React, { useState, ChangeEvent } from 'react';
import { useProduct, useProductDispatch } from 'vtex.product-context';

type Props = {
  showCalculatorTitle: boolean
  calculatorTitle: string
  showCalculatorSubTitle: boolean
  calculatorSubtitle: string
  widthLabel: string;
  widthPlaceholder: string;
  lengthLabel: string;
  lengthPlaceholder: string;
  errorText: string;
  warningText: string;
  calculateText: string;
  textBeforeResult: string;
  setQuantityText: string;
}

export const CSS_HANDLES = [
  'container',
  'title',
  'subtitle',
  'inputsContainer',
  'wrapper',
  'inputElement',
  'areaWidth',
  'label',
  'input',
  'areaLength',
  'errorMessage',
  'warningMessage',
  'calculateButton',
  'result',
  'setQuantityButton'
] as const

function AreaCalculator({
  showCalculatorTitle = true,
  calculatorTitle = 'Calculadora de área',
  showCalculatorSubTitle = true,
  calculatorSubtitle = 'Informe medidas',
  widthLabel = 'Largura (m)',
  widthPlaceholder = 'Ex: 1,50',
  lengthLabel = 'Comprimento (m)',
  lengthPlaceholder = 'Ex: 1,50',
  errorText = 'Os valores de largura e comprimento não podem ser 0',
  warningText = 'Esse é um valor estimado, recomendamos adicionar cerca de 10% a 20% à metragem calculada para o fator de segurança.',
  calculateText = 'Calcular área',
  textBeforeResult = 'Total:',
  setQuantityText = 'Atualizar quantidade',
}: Props) {
  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [showCalcButton, setShowCalcButton] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { handles } = useCssHandles(CSS_HANDLES);

  const productContext = useProduct();
  const dispatch = useProductDispatch();
  const selectedItem = productContext?.selectedItem;
  const unitMultiplier = selectedItem?.unitMultiplier;

  const calculateArea = () => {
    const widthValue = parseFloat(width);
    const lengthValue = parseFloat(length);

    if (isNaN(widthValue) || isNaN(lengthValue) || widthValue === 0 || lengthValue === 0) {
      setError(errorText);
      return;
    }

    const calculatedArea = widthValue * lengthValue;
    setArea(calculatedArea.toFixed(2));
    setShowCalcButton(false);
    setError('');
  };

  const updateQuantity = () => {
    if (!unitMultiplier || area === null || area === undefined || !dispatch) {
      return;
    }

    const areaValue = parseFloat(area);

    if (isNaN(areaValue)) {
      return;
    }

    const quantity = Math.ceil(areaValue / unitMultiplier);
    dispatch({ type: 'SET_QUANTITY', args: { quantity } });
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
    setShowCalcButton(true);
  };

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(e.target.value);
    setShowCalcButton(true);
  };

  return (
    <div className={`${handles.container}`}>
      {showCalculatorTitle && <p className={`${handles.title}`}>{calculatorTitle}</p>}
      {showCalculatorSubTitle && <p className={`${handles.subtitle}`}>{calculatorSubtitle}</p>}
      <div className={`${handles.inputsContainer}`}>
        <div className={`${handles.wrapper}`}>
          <div className={`${handles.inputElement}`}>
            <label className={`${handles.label}`} htmlFor='areaWidth'>{widthLabel}</label>
            <input className={`${handles.input}`}
              type="number"
              step="0.1"
              value={width}
              onChange={handleWidthChange}
              placeholder={widthPlaceholder}
              id='areaWidth'
            />
          </div>

          <div className={`${handles.inputElement}`}>
          <label className={`${handles.label}`} htmlFor="areaLength">{lengthLabel}</label>  
          <input className={`${handles.input}`}
              type="number"
              step="0.1"
              value={length}
              onChange={handleLengthChange}
              placeholder={lengthPlaceholder}
              id='areaLength'
            />
          </div>
        </div>
        {error && <p className={`${handles.errorMessage}`}>{error}</p>}
      </div>

      <p className={`${handles.warningMessage}`}>{warningText}</p>
      
      {showCalcButton ? (
        <button className={`${handles.calculateButton}`} onClick={calculateArea}>{calculateText}</button>
      ) : (
        <>
          <p className={`${handles.result}`}>{textBeforeResult} {area} m²</p>
          <button className={`${handles.setQuantityButton}`} onClick={updateQuantity}>{setQuantityText}</button>
        </>
      )}
    </div>
  );
}

AreaCalculator.schema = {
  title: 'Calculadora de área',
  description: 'App que recebe dois valores, retorna o valor da área e atualiza o seletor de quantidade da página de produto,',
  type: 'object',
  properties: {
    showCalculatorTitle: {
    title: 'Exibe título da calculadora?',
    type: 'boolean',
    default: true
    },
    calculatorTitle: {
      title: 'Texto do título da calculadora',
      type: 'string',
      default: 'Calculadora de área'
    },
    showCalculatorSubTitle: {
      title: 'Exibe subtítulo da calculadora?',
      type: 'boolean',
      default: true
    },
    calculatorSubTitle: {
      title: 'Texto do subtítulo da calculadora',
      type: 'string',
      default: 'Informe medidas'
    },
    widthLabel: {
      title: 'Label de largura',
      type: 'string',
      default: 'Label'
    },
    widthPlaceholder: {
      title: 'Placeholder de largura',
      type: 'string',
      default: 'Ex: 1,50'
    },
    lengthLabel: {
      title: 'Label de comprimento',
      type: 'string',
      default: 'Label'
    },
    lengthPlaceholder: {
      title: 'Placeholder de comprimento',
      type: 'string',
      default: 'Ex: 1,50'
    },
    errorText: {
      title: 'Mensagem de inputs vazios',
      type: 'string',
      default: 'Os valores de largura e comprimento não podem ser 0'
    },
    warningText: {
      title: 'Informativo',
      type: 'string',
      default: 'Esse é um valor estimado, recomendamos adicionar cerca de 10% a 20% à metragem calculada para o fator de segurança.'
    },
    calculateText: {
      title: 'Texto do botão de calcular',
      type: 'string',
      default: 'Calcular área'
    },
    textBeforeResult: {
      title: 'Texto antes do resultado',
      type: 'string',
      default: 'Total:'
    },
    setQuantityText: {
      title: 'Texto do botão de atualizar quantidade',
      type: 'string',
      default: 'Atualizar quantidade'
    }
  }
}

export default AreaCalculator;
