import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [load, setLoad] = useState("");
  const [temperature, setTemperature] = useState("");
  const [vibration, setVibration] = useState("");
  const [result, setResult] = useState("");

  const predict = async () => {
    try {
      const response = await axios.post("https://railway-load-monitoring-system-9.onrender.com/", {
        load: parseFloat(load),
        temperature: parseFloat(temperature),
        vibration: parseFloat(vibration),
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
      setResult("Backend Error");
    }
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">🚆</div>
          <div>
            <h1>RailBridge Monitor</h1>
            <p>High-Speed Train Load Analysis</p>
          </div>
        </div>
        <nav className="nav-links">
          <a className="active">Overview</a>
          <a>Sensors</a>
          <a>Analytics</a>
          <a>Alerts</a>
        </nav>
        <div className="top-actions">
          <span className="live-pill">● Live</span>
          <span className="notif">🔔<strong>3</strong></span>
          <span className="settings">⚙</span>
        </div>
      </header>

      <section className="dashboard-grid">
        <article className="card metric-card">
          <h3>Active Trains</h3>
          <div className="stat-value">4 <span className="stat-unit">trains</span></div>
          <div className="stat-hint success">↑ 2% from last hour</div>
          <span className="status-pill normal">normal</span>
        </article>

        <article className="card metric-card">
          <h3>Peak Load</h3>
          <div className="stat-value">78<span className="stat-unit">%</span></div>
          <div className="stat-hint success">↑ 5.2% from baseline</div>
          <span className="status-pill critical">danger</span>
        </article>

        <article className="card metric-card">
          <h3>Active Alerts</h3>
          <div className="stat-value">2 <span className="stat-unit">alerts</span></div>
          <div className="stat-hint danger">↓ 1% from yesterday</div>
          <span className="status-pill warning">warning</span>
        </article>

        <article className="card metric-card">
          <h3>Avg Temp</h3>
          <div className="stat-value">33<span className="stat-unit">°C</span></div>
          <div className="stat-hint success">↑ 2.1% above normal</div>
          <span className="status-pill normal">normal</span>
        </article>
      </section>

      <section className="overview-grid">
        <article className="card chart-card">
          <div className="card-header">
            <h2>Aggregate Load Distribution</h2>
            <span className="mini-hint">Real-time structural stress analysis</span>
          </div>
          <div className="fake-chart">
            <div className="x-axis">0% 25% 50% 75% 100%</div>
            <div className="line-graph" />
          </div>
          <div className="chart-legend">
            <span className="legend-blue">● Current Load</span>
            <span className="legend-red">● Safety Threshold</span>
          </div>
        </article>

        <aside className="card alerts-card">
          <div className="card-header">
            <h2>Sensor Network Status</h2>
            <span className="mini-hint">Active monitoring points</span>
          </div>
          {[
            { name: "Strain Gauge A1", value: "247 μɛ", status: "normal" },
            { name: "Strain Gauge B1", value: "354 μɛ", status: "critical" },
            { name: "Deck Temp North", value: "35 °C", status: "normal" },
            { name: "Deck Temp South", value: "23 °C", status: "normal" },
          ].map((sensor, idx) => (
            <div key={idx} className="sensor-row">
              <div>
                <div className="sensor-title">{sensor.name}</div>
                <div className="sensor-subtitle">{sensor.value}</div>
              </div>
              <span className={`status-pill ${sensor.status}`}>{sensor.status}</span>
              <div className="progress"><span style={{ width: sensor.status === "critical" ? "92%" : "62%" }} /></div>
            </div>
          ))}
        </aside>
      </section>

      <section className="overview-grid">
        <article className="card heatmap-card">
          <div className="card-header">
            <h2>Structural Stress Heatmap</h2>
            <span className="mini-hint">Deck surface load distribution</span>
          </div>
          <div className="heatmap-grid">
            {new Array(48).fill(0).map((_, i) => (
              <span key={i} className={`heat-cell c${(i % 12) + 1}`} />
            ))}
          </div>
          <div className="heatmap-labels">
            <span>West Approach</span>
            <span>Main Span</span>
            <span>East Approach</span>
          </div>
        </article>

        <article className="card traffic-card">
          <div className="card-header">
            <h2>Train Traffic</h2>
            <span className="mini-hint">Real-time schedule monitoring</span>
          </div>
          {[
            { name: " Delhi Express 4421", status: "On Bridge", route: "delhi → mumbai", speed: "2500 km/h", load: "450t" },
            { name: " Chennai Express 122", status: "Approaching", route: "chennai → bangalore", speed: "283 km/h", load: "420t" },
            { name: "Stappadi Express", status: "Scheduled", route: "Uttar Pradesh → Haryana", speed: "-", load: "380t" },
          ].map((train, idx) => (
            <div key={idx} className="traffic-item">
              <div>
                <h4>{train.name}</h4>
                <p className="light">{train.route}</p>
                <p className="light">{train.speed} • {train.load}</p>
              </div>
              <span className={`status-pill ${train.status === "Scheduled" ? "normal" : train.status === "Approaching" ? "warning" : "normal"}`}>
                {train.status}
              </span>
            </div>
          ))}
        </article>

        <article className="card system-alerts-card">
          <div className="card-header">
            <h2>System Alerts</h2>
            <span className="mini-hint">Real-time notifications</span>
          </div>
          {[
            { title: "High stress detected", detail: "Strain gauge B1 showing elevated readings at 78% capacity", age: "2 min ago", state: "warning" },
            { title: "Vibration threshold exceeded", detail: "Span 2 vibration sensor recording 1.5g during train passage", age: "5 min ago", state: "critical" },
          ].map((alert, idx) => (
            <div key={idx} className={`alert-item ${alert.state}`}>
              <h4>{alert.title}</h4>
              <p>{alert.detail}</p>
              <div className="alert-foot">
                <span>{alert.age}</span>
                <button className="ack-btn">Acknowledge</button>
              </div>
            </div>
          ))}
        </article>
      </section>

      <section className="card input-card">
        <h2>Predictive Load Health</h2>
        <div className="inputs">
          <input type="number" placeholder="Load" value={load} onChange={(e) => setLoad(e.target.value)} />
          <input type="number" placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
          <input type="number" placeholder="Vibration" value={vibration} onChange={(e) => setVibration(e.target.value)} />
          <button onClick={predict}>Predict Status</button>
        </div>
        <div className="prediction">
          Predicted State:
          <span className={result.toLowerCase().includes("danger") ? "danger" : "safe"}>
            {result || "--"}
          </span>
        </div>
      </section>
    </div>
  );
}

export default App;
