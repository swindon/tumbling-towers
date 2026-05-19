import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, RefreshCw, Play, Trophy, Home } from 'lucide-react';

type GameState = 'menu' | 'playing' | 'level_complete' | 'game_over' | 'how_to_play';

function generateDigits(): [number, number] {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function isValidPlacement(tower: (number | null)[], index: number, number: number) {
  if (tower[index] !== null) return false;
  
  for (let i = 0; i < index; i++) {
    if (tower[i] !== null && tower[i] >= number) return false;
  }
  
  for (let i = index + 1; i < tower.length; i++) {
    if (tower[i] !== null && tower[i] <= number) return false;
  }
  
  return true;
}

function canPlaceAnywhere(tower: (number | null)[], digits: [number, number]) {
  const num1 = digits[0] * 10 + digits[1];
  const num2 = digits[1] * 10 + digits[0];
  
  for (let i = 0; i < tower.length; i++) {
    if (tower[i] === null) {
      if (isValidPlacement(tower, i, num1) || isValidPlacement(tower, i, num2)) {
        return true;
      }
    }
  }
  return false;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState<number>(() => {
    const saved = localStorage.getItem('tumbling_towers_top_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [tower, setTower] = useState<(number | null)[]>([]);
  const [digits, setDigits] = useState<[number, number]>([0, 0]);
  const [isSwapping, setIsSwapping] = useState(false);
  
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showLevelCompleteModal, setShowLevelCompleteModal] = useState(false);
  const [showHomeConfirmModal, setShowHomeConfirmModal] = useState(false);

  useEffect(() => {
    if (score > topScore) {
      setTopScore(score);
      localStorage.setItem('tumbling_towers_top_score', score.toString());
    }
  }, [score, topScore]);

  useEffect(() => {
    if (gameState === 'game_over') {
      const timer = setTimeout(() => setShowGameOverModal(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowGameOverModal(false);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'level_complete') {
      const timer = setTimeout(() => setShowLevelCompleteModal(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowLevelCompleteModal(false);
    }
  }, [gameState]);

  const startLevel = (lvl: number) => {
    const numBlocks = lvl + 1;
    setTower(Array(numBlocks).fill(null));
    setDigits(generateDigits());
    setLevel(lvl);
    setGameState('playing');
  };
  
  const startGame = () => {
    setScore(0);
    startLevel(1);
  };
  
  const handleSwap = () => {
    if (isSwapping || gameState !== 'playing') return;
    setIsSwapping(true);
    setTimeout(() => {
      setDigits([digits[1], digits[0]]);
      setIsSwapping(false);
    }, 150);
  };
  
  const handlePlace = (index: number) => {
    if (gameState !== 'playing') return;
    
    const number = digits[0] * 10 + digits[1];
    if (!isValidPlacement(tower, index, number)) return;
    
    const newTower = [...tower];
    newTower[index] = number;
    setTower(newTower);
    setScore(s => s + 10);
    
    if (newTower.every(block => block !== null)) {
      setGameState('level_complete');
    } else {
      const newDigits = generateDigits();
      setDigits(newDigits);
      if (!canPlaceAnywhere(newTower, newDigits)) {
        setGameState('game_over');
      }
    }
  };

  const handleHomeClick = () => {
    if (gameState === 'playing') {
      setShowHomeConfirmModal(true);
    } else {
      setGameState('menu');
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 font-pixel relative overflow-hidden pb-32 md:pb-40">
        <div className="absolute top-4 md:top-8 left-0 right-0 max-w-2xl mx-auto w-full px-4 md:px-8 flex justify-end z-20">
          <div className="text-[10px] md:text-xs font-bold text-black uppercase tracking-widest bg-white/50 px-2 py-0.5 pixel-border-sm scale-90 origin-right">
            Top: {topScore}
          </div>
        </div>
        <CloudsBackground />
        {/* City Silhouette Background */}
        <div className="absolute bottom-32 md:bottom-40 left-0 right-0 h-64 bg-[#4a90e2] opacity-50 z-0" style={{ clipPath: 'polygon(0 100%, 0 60%, 10% 60%, 10% 40%, 20% 40%, 20% 70%, 30% 70%, 30% 30%, 40% 30%, 40% 50%, 50% 50%, 50% 20%, 60% 20%, 60% 60%, 70% 60%, 70% 40%, 80% 40%, 80% 80%, 90% 80%, 90% 50%, 100% 50%, 100% 100%)' }}></div>
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-[#9b6a46] border-t-8 border-[#8bcf3f] z-10 pixel-border-sm"></div>

        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 relative z-20"
        >
          <div className="flex justify-center mb-4">
            <Trophy size={64} className="text-[#facc15] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase tracking-wider">
            Tumbling<br/>Towers
          </h1>
          <p className="text-white mt-4 text-xl max-w-sm mx-auto drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
            Stack numbers in ascending order. Don't let the tower tumble!
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6 w-full max-w-xs relative z-20"
        >
          <button onClick={() => startGame()} className="w-full py-4 bg-[#facc15] hover:bg-[#eab308] text-black pixel-border pixel-shadow active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-bold text-2xl uppercase">
            Play Game
          </button>
          <button onClick={() => setGameState('how_to_play')} className="w-full py-4 bg-white hover:bg-gray-200 text-black pixel-border pixel-shadow active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-bold text-2xl uppercase">
            How to Play
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'how_to_play') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 font-pixel relative overflow-hidden pb-32 md:pb-40">
        <CloudsBackground />
        <div className="absolute bottom-32 md:bottom-40 left-0 right-0 h-64 bg-[#4a90e2] opacity-50 z-0" style={{ clipPath: 'polygon(0 100%, 0 60%, 10% 60%, 10% 40%, 20% 40%, 20% 70%, 30% 70%, 30% 30%, 40% 30%, 40% 50%, 50% 50%, 50% 20%, 60% 20%, 60% 60%, 70% 60%, 70% 40%, 80% 40%, 80% 80%, 90% 80%, 90% 50%, 100% 50%, 100% 100%)' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-[#9b6a46] border-t-8 border-[#8bcf3f] z-10 pixel-border-sm"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#3b82c4] p-6 md:p-8 max-w-lg w-full pixel-border pixel-shadow relative z-20 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">How to Play</h2>
          
          <ul className="space-y-4 text-sm md:text-base mb-8">
            <li className="flex gap-3">
              <span className="text-[#facc15] font-bold">01.</span>
              <p>You are dealt two random digits (0-9) each turn.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#facc15] font-bold">02.</span>
              <p>Swap them to form a two-digit number (e.g., 2 and 7 can be 27 or 72).</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#facc15] font-bold">03.</span>
              <p>Place the number in an empty block in the tower.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#facc15] font-bold">04.</span>
              <p className="text-[#facc15] font-bold uppercase underline">Rule:</p>
              <p>Numbers MUST be in ascending order from bottom to top.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#facc15] font-bold">05.</span>
              <p>If you can't place either combination, the tower tumbles! GAME OVER.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#facc15] font-bold">06.</span>
              <p>Fill all blocks to clear the level and advance.</p>
            </li>
          </ul>

          <button onClick={() => setGameState('menu')} className="w-full py-4 bg-[#facc15] hover:bg-[#eab308] text-black pixel-border pixel-shadow active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-bold text-xl uppercase">
            Back to Menu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 font-pixel relative overflow-hidden pb-32 md:pb-40">
      <CloudsBackground />
      {/* City Silhouette Background */}
      <div className="absolute bottom-32 md:bottom-40 left-0 right-0 h-64 bg-[#4a90e2] opacity-50 z-0" style={{ clipPath: 'polygon(0 100%, 0 60%, 10% 60%, 10% 40%, 20% 40%, 20% 70%, 30% 70%, 30% 30%, 40% 30%, 40% 50%, 50% 50%, 50% 20%, 60% 20%, 60% 60%, 70% 60%, 70% 40%, 80% 40%, 80% 80%, 90% 80%, 90% 50%, 100% 50%, 100% 100%)' }}></div>
      
      {/* Header */}
      <div className="flex justify-between items-start text-white mb-6 max-w-2xl mx-auto w-full relative z-20">
        <div className="flex items-center gap-4">
          <button onClick={handleHomeClick} className="p-2 bg-white text-black pixel-border-sm pixel-shadow-sm hover:bg-gray-200 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            <Home size={24} />
          </button>
          <div className="text-2xl md:text-3xl font-bold tracking-wider text-black uppercase">
            LVL. {level}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xl md:text-2xl font-bold bg-white text-black px-4 py-2 pixel-border-sm pixel-shadow-sm uppercase">
            Score: {score}
          </div>
          <div className="text-[10px] md:text-xs font-bold text-black uppercase tracking-widest mt-1 bg-white/50 px-2 py-0.5 pixel-border-sm scale-90 origin-right">
            Top: {topScore}
          </div>
        </div>
      </div>
      
      {/* Tower Area */}
      <div className="flex-1 overflow-y-auto flex flex-col w-full max-w-2xl mx-auto hide-scrollbar relative z-20">
        <div className="mt-auto flex flex-col-reverse items-center gap-1 w-full">
          <AnimatePresence>
            {tower.map((block, index) => {
              const currentNumber = digits[0] * 10 + digits[1];
              const valid = block === null && isValidPlacement(tower, index, currentNumber);
              
              return (
                <Block 
                  key={`${level}-${index}`}
                  value={block} 
                  index={index}
                  valid={valid}
                  isGameOver={gameState === 'game_over'}
                  onClick={() => handlePlace(index)} 
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Full Width Ground / Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-[#9b6a46] border-t-8 border-[#8bcf3f] z-30 pixel-border-sm flex items-center justify-center">
        <div className="flex items-center justify-center gap-3 md:gap-6">
          <Card value={digits[0]} isSwapping={isSwapping} small />
          <button 
            onClick={handleSwap} 
            disabled={gameState !== 'playing' || isSwapping}
            className="p-3 bg-[#facc15] text-black pixel-border pixel-shadow hover:bg-[#eab308] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50 disabled:active:translate-y-0 disabled:active:translate-x-0 disabled:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
          >
            <ArrowLeftRight size={28} strokeWidth={3} />
          </button>
          <Card value={digits[1]} isSwapping={isSwapping} small />
        </div>
      </div>
      
      {/* Modals */}
      <AnimatePresence>
        {showGameOverModal && (
          <Modal>
            <h2 className="text-4xl font-bold text-[#ef4444] mb-2 drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">Tower Tumbled!</h2>
            <p className="text-xl text-white mb-6 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">No valid moves left for {digits[0]}{digits[1]} or {digits[1]}{digits[0]}.</p>
            <div className="bg-white text-black pixel-border-sm p-4 mb-8">
              <p className="text-sm uppercase font-bold tracking-wider mb-1 text-gray-500">Final Score</p>
              <p className="text-4xl font-bold">{score}</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setGameState('menu')}>Menu</Button>
              <Button primary onClick={() => startGame()}>Try Again</Button>
            </div>
          </Modal>
        )}
        
        {showLevelCompleteModal && (
          <Modal>
            <h2 className="text-4xl font-bold text-[#4ade80] mb-2 drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">
              Level Cleared!
            </h2>
            <p className="text-xl text-white mb-8 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
              Great job stacking those numbers.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => setGameState('menu')}>Menu</Button>
              <Button primary onClick={() => startLevel(level + 1)}>
                Next Level <Play className="inline ml-1" size={18} fill="currentColor" />
              </Button>
            </div>
          </Modal>
        )}

        {showHomeConfirmModal && (
          <Modal>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">
              Exit Game?
            </h2>
            <p className="text-xl text-white mb-8 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
              Your current progress will be lost!
            </p>
            <div className="flex gap-4">
              <Button onClick={() => setShowHomeConfirmModal(false)}>Stay</Button>
              <Button primary onClick={() => {
                setShowHomeConfirmModal(false);
                setGameState('menu');
              }}>Exit</Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

const Block = ({ value, onClick, valid, isGameOver, index }: any) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={value !== null || isGameOver || !valid}
      initial={{ opacity: 0, y: -20 }}
      animate={isGameOver ? { 
        y: [0, -20, 800], 
        x: (Math.random() - 0.5) * 400,
        rotate: (Math.random() - 0.5) * 180,
        opacity: [1, 1, 0] 
      } : { opacity: 1, y: 0 }}
      transition={isGameOver ? { duration: 1, delay: index * 0.08, ease: "easeIn" } : { type: 'spring', stiffness: 400, damping: 25 }}
      className={`w-48 sm:w-56 h-14 sm:h-16 pixel-border flex items-center justify-center text-4xl font-bold transition-colors relative
        ${value !== null 
          ? 'bg-[#facc15] text-black pixel-shadow' 
          : valid 
            ? 'bg-white/40 border-dashed border-white hover:bg-white/60 cursor-pointer text-white shadow-none' 
            : 'bg-black/20 border-dashed border-black/50 cursor-not-allowed text-transparent shadow-none'}`}
    >
      {value !== null ? value : (valid ? <span className="text-sm uppercase tracking-widest opacity-90 font-bold text-black">Place Here</span> : '')}
    </motion.button>
  );
};

const Card = ({ value, isSwapping, small }: any) => (
  <motion.div 
    animate={{ rotateY: isSwapping ? 90 : 0, scale: isSwapping ? 1.1 : 1 }}
    transition={{ duration: 0.15 }}
    className={`${small ? 'w-16 h-24 sm:w-20 sm:h-28 text-5xl' : 'w-24 h-32 sm:w-28 sm:h-40 text-7xl'} bg-white pixel-border pixel-shadow flex items-center justify-center font-bold text-black relative overflow-hidden`}
  >
    {value}
  </motion.div>
);

const Modal = ({ children }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-[#3b82c4] p-8 max-w-sm w-full pixel-border pixel-shadow text-center"
    >
      {children}
    </motion.div>
  </motion.div>
);

const Button = ({ children, onClick, primary }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 px-4 font-bold text-xl uppercase transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center pixel-border pixel-shadow ${
      primary 
        ? 'bg-[#facc15] text-black hover:bg-[#eab308]' 
        : 'bg-white text-black hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

const Cloud = ({ top, duration, delay, scale, opacity }: any) => (
  <div 
    className="absolute left-0 z-0 animate-float"
    style={{ 
      top: `${top}%`, 
      opacity, 
      '--cloud-scale': scale,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`
    } as React.CSSProperties}
  >
    <div className="relative w-32 h-16">
      <div className="absolute bottom-0 left-4 w-24 h-4 bg-white"></div>
      <div className="absolute bottom-4 left-0 w-32 h-4 bg-white"></div>
      <div className="absolute bottom-8 left-4 w-20 h-4 bg-white"></div>
      <div className="absolute bottom-12 left-8 w-12 h-4 bg-white"></div>
    </div>
  </div>
);

const CloudsBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <Cloud top={10} duration={40} delay={-5} scale={1.5} opacity={0.8} />
    <Cloud top={25} duration={55} delay={-25} scale={1} opacity={0.6} />
    <Cloud top={15} duration={45} delay={-15} scale={1.2} opacity={0.7} />
    <Cloud top={35} duration={60} delay={-40} scale={0.8} opacity={0.5} />
    <Cloud top={5} duration={70} delay={-60} scale={1.8} opacity={0.9} />
  </div>
);
