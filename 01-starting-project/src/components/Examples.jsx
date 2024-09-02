import { useState } from 'react';

import { TOPICS } from '../data.js';
import TabButton from './TabButton.jsx';
import Section from './Section.jsx';
import Tabs from './Tabs.jsx';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleClick(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  let tabContent = <p>Please select a topic.</p>

  if (selectedTopic) {
    tabContent = (
    <div id="tab-content">
      <h3>{TOPICS[selectedTopic].title}</h3>
          <p>{TOPICS[selectedTopic].description}</p>
          <pre>
            <code>
              {TOPICS[selectedTopic].code}
            </code>
          </pre>
      </div>
    )
  };
  
  return (
    <Section title="Examples" id="examples">
      <Tabs
        ButtonsContainer="menu"
        buttons={
          Object.keys(TOPICS).map((item) => (
            <TabButton
            key={item}
            extra={item === "components" && ' <3'}
            onClick={() => handleClick(item)}
            isSelected={selectedTopic == item}
            > {TOPICS[item].title} </TabButton>
          ))
        }
      >
        {/* above code is the same as bellow 
          {
            <TabButton extra=' <3' handleClick={() => handleClick("components")} isSelected={selectedTopic === "components"} >Components</TabButton>
            <TabButton handleClick={() => handleClick("jsx")} isSelected={selectedTopic === "jsx"} >JSX</TabButton>
            <TabButton handleClick={() => handleClick("props")} isSelected={selectedTopic === "props"} >Props</TabButton>
            <TabButton handleClick={() => handleClick("state")} isSelected={selectedTopic === "state"} >States</TabButton>
          }
        */}
        {tabContent}
      </Tabs>
    </Section>
  );
}
