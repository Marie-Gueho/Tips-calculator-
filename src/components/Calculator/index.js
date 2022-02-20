// == Import
import { useRef, useState, useEffect } from 'react';

import './styles.scss';

import dollar from '../../../images/icon-dollar.svg';
import people from '../../../images/icon-person.svg';
import Button from '../Button';
import Input from '../Input';

// == Composant
const Calculator = () => {
  const [tipBtn, setTipBtn] = useState({
    activeBtn: { id: '2', value: '15%' },
    btns: [
      { id: '0', value: '5%' },
      { id: '1', value: '10%' },
      { id: '2', value: '15%' },
      { id: '3', value: '25%' },
      { id: '4', value: '50%' },
    ],
  });
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [total, setTotal] = useState(0);

  const bill = useRef(null);
  const chosenTip = useRef({ value: 15 });
  const custom = useRef(null);
  const nbrPeople = useRef(null);

  useEffect(() => {
    setTipBtn({
      ...tipBtn,
      activeBtn: tipBtn.btns['2'],
    });
  }, []);

  const toggleActiveClass = (id) => {
    if (tipBtn.btns[id] === tipBtn.activeBtn) {
      return 'button-standard__active';
    }
    return 'button-standard';
  };

  const tipUpdate = (e) => {
    if (e.target.type === 'button') {
      custom.current.value = '';
      setTipBtn({
        ...tipBtn,
        activeBtn: tipBtn.btns[e.target.id],
      });
    }
    else {
      setTipBtn({ ...tipBtn, activeBtn: null });
    }

    chosenTip.current.value = e.target.value;
  };

  const totalSubmit = (e) => {
    e.preventDefault();

    const finalBill = Number(bill.current.value);
    const numberPerson = Number(nbrPeople.current.value);
    const totalTip = finalBill * (Number(chosenTip.current.value) / 100);
    const totalPerPerson = (finalBill + totalTip) / numberPerson;
    const tip = Number(totalTip) / numberPerson;

    setTipPerPerson(tip);
    setTotal(totalPerPerson);
  };

  const resetSplitter = () => {
    bill.current.value = null;
    chosenTip.current = { value: 15 };
    nbrPeople.current.value = null;
    setTipBtn({
      ...tipBtn,
      activeBtn: tipBtn.btns['2'],
    });
    setTipPerPerson(0);
    setTotal(0);
  };

  return (
    <section className="calculator">
      <form className="calculator-form" onSubmit={totalSubmit}>
        <div className="calculator-left">
          <div className="calculator-left__container">
            <div className="calculator-left__bill">
              <Input
                refAnchor={bill}
                type="number"
                name="bill"
                placeholder="0"
                required
              />
              <img src={dollar} alt="dollar-icon" />
            </div>
            <div className="calculator-left__tip">
              <p>Select Tip %</p>
              <div className="calculator-left__btns">
                {tipBtn.btns.map((btn) => (
                  <Button
                    key={btn.id}
                    className={toggleActiveClass(btn.id)}
                    content={btn.value}
                    onBtnClick={tipUpdate}
                    id={btn.id}
                  />
                ))}
                <Input
                  refAnchor={custom}
                  type="number"
                  placeholder="Custom"
                  onChange={tipUpdate}
                />
              </div>
            </div>
            <div className="calculator-left__people">
              <Input
                refAnchor={nbrPeople}
                type="number"
                name="number of people"
                placeholder="0"
                required
              />
              <img src={people} alt="people-icon" />
            </div>
          </div>
        </div>
        <div className="calculator-right">
          <div className="calculator-right__container">
            <div className="calculator-right__tip">
              <p>
                Tip Amount <span>/ person</span>
              </p>

              <p>{`$${tipPerPerson.toFixed(2)}`}</p>
            </div>
            <div className="calculator-right__total">
              <p>
                Total <span>/ person</span>
              </p>
              <p>{`$${total.toFixed(2)}`}</p>
            </div>
            <button className="calculator-right__btn" type="submit">
              CALCULATE
            </button>
            <button className="calculator-right__btn" type="button" onClick={resetSplitter}>
              RESET
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

// == Export
export default Calculator;
