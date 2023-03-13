import { useState } from 'react';

import { GlobalStyle } from './GlobalStyles';
import { Wrapper } from './App.styled';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notifications/Notification';
import { FeedbackSection } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';

export function App() {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const addFeedback = state => {
    setState(prevState => ({ ...prevState, [state]: prevState[state] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, value) => acc + value);
  };

  const countPositiveFeedbackPercentage = () => {
    if (!countTotalFeedback()) return 0;
    return Math.round((state.good / countTotalFeedback()) * 100);
  };

  const { good, neutral, bad } = state;
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Wrapper>
      <FeedbackSection title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={addFeedback}
        />
      </FeedbackSection>

      <FeedbackSection title="Statistics">
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />

        <Notification total={total} message="There is no feedback" />
      </FeedbackSection>

      <GlobalStyle />
    </Wrapper>
  );
}

// export class OldApp extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   addFeedback = state => {
//     this.setState(prevState => ({
//       [state]: prevState[state] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     return Object.values(this.state).reduce((acc, value) => acc + value);
//   };

// countPositiveFeedbackPercentage = () => {
//   if (!this.countTotalFeedback()) return 0;
//   return Math.round((this.state.good / this.countTotalFeedback()) * 100);
// };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();

//     return (
// <Wrapper>
//   <FeedbackSection title="Please leave feedback">
//     <FeedbackOptions
//       options={['good', 'neutral', 'bad']}
//       onLeaveFeedback={this.addFeedback}
//     />
//   </FeedbackSection>

//   <FeedbackSection title="Statistics">
//     <Statistics
//       good={good}
//       neutral={neutral}
//       bad={bad}
//       total={total}
//       positivePercentage={positivePercentage}
//     />

//     <Notification total={total} message="There is no feedback" />
//   </FeedbackSection>

//   <GlobalStyle />
// </Wrapper>
//     );
//   }
// }
