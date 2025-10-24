import { useState, useEffect } from 'react'
import './Timer.css'

function Timer({ todo, onClose }) {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds)

  // 更新時間顯示
  useEffect(() => {
    setTimeLeft(minutes * 60 + seconds)
  }, [minutes, seconds])

  // 計時器邏輯
  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      // 時間到時的提示
      alert('時間到！🍅')
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  // 格式化時間顯示
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(minutes * 60 + seconds)
  }

  const handleCancel = () => {
    setIsRunning(false)
    onClose()
  }

  return (
    <div className="timer-overlay">
      <div className="timer-modal">
        <div className="timer-header">
          <h3>🍅 番茄鐘計時器</h3>
          <p className="todo-name">{todo.text}</p>
        </div>

        <div className="timer-display">
          <div className="time-circle">
            <span className="time-text">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="timer-controls">
          <div className="time-inputs">
            <div className="input-group">
              <label>分鐘</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
            <div className="input-group">
              <label>秒鐘</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="control-buttons">
            {!isRunning ? (
              <button className="start-btn" onClick={handleStart}>
                ▶️ 開始
              </button>
            ) : (
              <button className="pause-btn" onClick={handlePause}>
                ⏸️ 暫停
              </button>
            )}
            <button className="reset-btn" onClick={handleReset}>
              🔄 重置
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              ❌ 取消
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer
