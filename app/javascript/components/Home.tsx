/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

import * as React from "react";
import type {FC as ReactFC} from 'react';

type HomeProps = {
  name: string;
}

const Home: ReactFC<HomeProps> = ({name}) => {
  return (
    <div>
      <h1 className="text-4xl">Home Component</h1>
      <p>{name}</p>
    </div>
  )
}

export default Home;
