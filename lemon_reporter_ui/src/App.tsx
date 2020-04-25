import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { LemonInvesting } from './common/entities/investing';

const App: React.FunctionComponent<{ investings: ReadonlyArray<LemonInvesting> }> = ({ investings }) => {
  const [isHiddenPayoffReportBtn, setIsHiddenPayoffReportBtn] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth());
  const daysInCurrentMonth = getDaysInMonth(month);
  return (
    <div className="app">
      <div className="sidebar">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="content">
          <button
            className="link-toggle"
            onClick={() => setIsHiddenPayoffReportBtn(!isHiddenPayoffReportBtn)}
          >
            Отчёты</button>
          <button className={["link-toggle-content", isHiddenPayoffReportBtn ? "hidden" : ""].join(" ")}>Отчёт по выплатам</button>
        </div>
      </div>
      <div className="body">
        <div className="header"></div>
        <div className="content">
          <h3 className="h3">
            Выплаты в деревянных
          </h3>
          <div className="overflow-wrapper">
            <div className="table">
              <div className="table-header">
                <div className="date">
                  Дата за месяц : <input max="12" min="1" className="month-input" type="number" value={month + 1} onChange={(e) => setMonth(Number(e.target.value) - 1)} />
                </div>
                {getDaysArr(daysInCurrentMonth).map(d => (<div key={d} className="day">{d}</div>))}
              </div>
              <div className="table-body">
                {investings.map(i => (
                  <div className="row" key={i.id}>
                    <div className="name">{i.name}</div>
                    {getDaysArr(daysInCurrentMonth).map(d => {
                      const payOff = i.payOffs.find(p => p.getDate() === d);
                      return !!payOff
                        ? (<div key={d} className="money">{payOff.moneyRub}</div>)
                        : (<div key={d} className="money"></div>)
                    })
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

const getDaysInMonth = (month: number, year: number | undefined = undefined) => {
  year = !year ? new Date().getFullYear() : year;
  return new Date(year, month, 0).getDate();
};

const getDaysArr = (days: number) => {
  const keys = Array.from(Array(days).keys());
  return [...keys].map(d => d + 1);
};

export default App;
