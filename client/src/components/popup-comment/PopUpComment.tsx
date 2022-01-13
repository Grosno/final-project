import React, { ReactNode, SyntheticEvent } from 'react';
import './PopUpComment.scss';

interface IState {
  hovered: boolean;
}

interface IProps {
  comment: string;
  children: ReactNode;
}

export class PopUpComment extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hovered: false };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver(event: SyntheticEvent) {
    this.setState({ hovered: true });
    event.stopPropagation();
  }

  mouseOut(event:SyntheticEvent) {
    this.setState({ hovered: false });
    event.stopPropagation();
  }

  render(): React.ReactNode {
    return (
        // eslint-disable-next-line
        <div className="component-with-helper" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          {this.state.hovered && <div className="component-with-helper__helper">{this.props.comment}</div>}
          {this.props.children}
        </div>
    );
  }
}
