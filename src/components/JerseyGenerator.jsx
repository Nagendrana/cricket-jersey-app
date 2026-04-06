import { useState } from 'react'
import './JerseyGenerator.css'

function JerseyGenerator() {
  const [jerseyNumber, setJerseyNumber] = useState(null)
  const [history, setHistory] = useState([])

  const legendPlayers = {
    7:  { name: 'MS Dhoni', emoji: '🧤' },
    18: { name: 'Virat Kohli', emoji: '👑' },
    45: { name: 'Rohit Sharma', emoji: '🏏' },
    10: { name: 'Sachin Tendulkar', emoji: '⭐' },
    99: { name: 'Rahul Dravid', emoji: '🛡️' },
    63: { name: 'Hardik Pandya', emoji: '💥' },
  }

  const generateJersey = () => {
    let newNumber
    do {
      newNumber = Math.floor(Math.random() * 99) + 1
    } while (history.includes(newNumber) && history.length < 99)

    setJerseyNumber(newNumber)
    setHistory(prev => [newNumber, ...prev].slice(0, 5))
  }

  const handleReset = () => {
    setJerseyNumber(null)
    setHistory([])
  }

  const getZone = (num) => {
    if (num <= 33) return { label: 'Blue Zone', cls: 'zone-blue' }
    if (num <= 66) return { label: 'Green Zone', cls: 'zone-green' }
    return { label: 'Gold Zone', cls: 'zone-gold' }
  }

  const isLegend = jerseyNumber && legendPlayers[jerseyNumber]
  const zone = jerseyNumber ? getZone(jerseyNumber) : null

  return (
    <div className="wrapper">
      <div className="card">

        <div className="card-header">
          <div className="trophy">🏏</div>
          <h1 className="title">Cricket Jersey</h1>
          <p className="subtitle">Random Number Generator</p>
        </div>

        {jerseyNumber === null ? (
          <div className="empty-state">
            <div className="empty-icon">👕</div>
            <p className="empty-text">No jersey assigned yet!</p>
            <p className="empty-hint">Click below to assign a jersey number</p>
          </div>
        ) : (
          <div className="jersey-display">
            <div className={`jersey-card ${zone.cls}`}>
              <div className="jersey-shape">
                <span className="jersey-num">{jerseyNumber}</span>
              </div>
              <div className={`zone-badge ${zone.cls}`}>{zone.label}</div>
            </div>

            {isLegend && (
              <div className="legend-banner">
                <span className="legend-emoji">{legendPlayers[jerseyNumber].emoji}</span>
                <div>
                  <p className="legend-title">Legend Number!</p>
                  <p className="legend-name">{legendPlayers[jerseyNumber].name} wore this!</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="btn-group">
          <button className="btn btn-assign" onClick={generateJersey}>
            🎲 Assign Jersey
          </button>
          <button className="btn btn-reset" onClick={handleReset}>
            ↺ Reset
          </button>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <p className="history-label">Last 5 Assigned</p>
            <div className="history-list">
              {history.map((num, index) => (
                <div
                  key={index}
                  className={`history-badge ${getZone(num).cls} ${index === 0 ? 'latest' : ''}`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default JerseyGenerator