/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');
const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
let heartCount = 1;

function getRandomColor() {
  return `rgb(${getRandomNumber(100, 144)}, ${getRandomNumber(
    10,
    200,
  )},${getRandomNumber(200, 244)})`;
}

export default function App() {
  const [hearts, setHearts] = useState([]);
  // const [heartCount, setHeartCount] = useState(1);

  const addHeart = () => {
    setHearts([
      ...hearts,
      {
        id: heartCount,
        color: getRandomColor(),
        right: getRandomNumber(20, 150),
      },
    ]);
    // setHeartCount(temp + 1);
    heartCount++;
  };

  // const removeHeart = (id) => {
  //   let temp = hearts;
  //   setHearts(
  //     temp.filter((heart) => {
  //       return heart.id !== id;
  //     }),
  //   );
  // };

  console.log(hearts);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {hearts.map((heart) => (
          <HeartContainer
            // onComplete={() => removeHeart(heart.id)}
            style={{right: heart.right}}
            key={heart.id}
            color={heart.color}
          />
        ))}
      </View>
      <TouchableOpacity onPress={addHeart} style={styles.addButton}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const HeartContainer = (props) => {
  // const {onComplete = () => {}} = props;

  const [position, setPosition] = useState(new Animated.Value(0));
  const yAnimation = position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0],
  });
  const opacityAnimation = yAnimation.interpolate({
    inputRange: [0, animationEndY],
    outputRange: [1, 0],
  });

  const scaleAnimation = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 2, 1],
    extrapolate: 'clamp',
  });
  const xAnimation = yAnimation.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY,
    ],
    outputRange: [0, 25, 15, 0, 10],
  });
  const rotateAnimation = yAnimation.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY,
    ],
    outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
  });

  useEffect(() => {
    Animated.timing(position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const getHeartStyle = () => {
    return {
      transform: [
        {translateY: position},
        {scale: scaleAnimation},
        {translateX: xAnimation},
        {rotate: rotateAnimation},
      ],
      opacity: opacityAnimation,
    };
  };
  return (
    <Animated.View
      style={[styles.heartContainer, getHeartStyle(), props.style]}>
      <Heart color={props.color} />
    </Animated.View>
  );
};

const Heart = (props) => {
  return (
    <View {...props} style={[styles.heart, props.style]}>
      <Icon name="heart" size={48} color={props.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  addButton: {
    backgroundColor: '#378ad9',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 32,
    left: 32,
  },

  heartContainer: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'transparent',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
