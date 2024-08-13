// This would be stored in the 'src' folder of the GitHub repository
// airplane-shooter.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const AirplaneShooter = ({ assetsUrl }) => {
    const [airplanes, setAirplanes] = useState([]);
    const [score, setScore] = useState(0);
    const [playerAirplane, setPlayerAirplane] = useState({ x: 50, y: 90, width: 50, height: 30 });

    useEffect(() => {
      const interval = setInterval(() => {
        spawnAirplane();
      }, 2000);

      const handleKeyDown = (event) => {
        switch (event.key.toLowerCase()) {
          case 'a':
            movePlayerAirplane('left');
            break;
          case 'd':
            movePlayerAirplane('right');
            break;
          case 'w':
            movePlayerAirplane('up');
            break;
          case 's':
            movePlayerAirplane('down');
            break;
          default:
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    const spawnAirplane = () => {
      const newAirplane = {
        x: Math.floor(Math.random() * 80) + 10,
        y: 0,
        width: 50,
        height: 30,
        speed: Math.floor(Math.random() * 3) + 1,
      };
      setAirplanes((prevAirplanes) => [...prevAirplanes, newAirplane]);
    };

    const handleShoot = (index) => {
      setAirplanes((prevAirplanes) => {
        const updatedAirplanes = [...prevAirplanes];
        updatedAirplanes.splice(index, 1);
        setScore((prevScore) => prevScore + 1);
        return updatedAirplanes;
      });
    };

    const moveAirplanes = () => {
      setAirplanes((prevAirplanes) =>
        prevAirplanes.map((airplane) => ({
          ...airplane,
          y: airplane.y + airplane.speed,
        }))
      );
    };

    const movePlayerAirplane = (direction) => {
      setPlayerAirplane((prevPlayerAirplane) => {
        let newX = prevPlayerAirplane.x;
        let newY = prevPlayerAirplane.y;
        if (direction === 'left') {
          newX = Math.max(10, prevPlayerAirplane.x - 5);
        } else if (direction === 'right') {
          newX = Math.min(90, prevPlayerAirplane.x + 5);
        } else if (direction === 'up') {
          newY = Math.max(30, prevPlayerAirplane.y - 5);
        } else if (direction === 'down') {
          newY = Math.min(90, prevPlayerAirplane.y + 5);
        }
        return { ...prevPlayerAirplane, x: newX, y: newY };
      });
    };

    useEffect(() => {
      const interval = setInterval(moveAirplanes, 50);
      return () => clearInterval(interval);
    }, [moveAirplanes]);

    return React.createElement(
      'div',
      { className: "airplane-shooter" },
      React.createElement('h1', null, "Airplane Shooter"),
      React.createElement('div', { className: "score" }, `Score: ${score}`),
      React.createElement(
        'div',
        { className: "game-area" },
        airplanes.map((airplane, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: "airplane",
              style: {
                left: `${airplane.x}%`,
                top: `${airplane.y}%`,
                width: `${airplane.width}px`,
                height: `${airplane.height}px`,
              },
              onClick: () => handleShoot(index),
            },
            React.createElement('img', { src: `${assetsUrl}/airplane.png`, alt: "Airplane" })
          )
        ),
        React.createElement(
          'div',
          {
            className: "player-airplane",
            style: {
              left: `${playerAirplane.x}%`,
              top: `${playerAirplane.y}%`,
              width: `${playerAirplane.width}px`,
              height: `${playerAirplane.height}px`,
            },
          },
          React.createElement('img', { src: `${assetsUrl}/player-airplane.png`, alt: "Player Airplane" })
        )
      )
    );
  };

  return () => React.createElement(AirplaneShooter, { assetsUrl: assetsUrl });
};

console.log('Airplane Shooter game script loaded');
