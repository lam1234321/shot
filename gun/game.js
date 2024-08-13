// This would be stored in the 'src' folder of the GitHub repository
// airplane-shooter.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const AirplaneShooter = ({ assetsUrl }) => {
    const [airplanes, setAirplanes] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        spawnAirplane();
      }, 2000);

      return () => clearInterval(interval);
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
            null
          )
        )
      )
    );
  };

  return () => React.createElement(AirplaneShooter, { assetsUrl: assetsUrl });
};

console.log('Airplane Shooter game script loaded');