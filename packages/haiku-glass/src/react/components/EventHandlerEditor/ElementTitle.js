import React from 'react'
import {get} from 'lodash'
import {EventsBoltIcon} from 'haiku-ui-common/lib/react/OtherIcons'
import Palette from 'haiku-ui-common/lib/Palette'
import truncate from 'haiku-ui-common/lib/helpers/truncate'

const STYLES = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    color: Palette.PALE_GRAY,
    backgroundColor: Palette.LIGHTEST_PINK,
    zIndex: 10000,
    fontSize: '11px',
    cursor: 'pointer',
    borderRadius: '2px',
    padding: '5px 9px',
    display: 'flex',
    alignItems: 'center'
  },
  buttonText: {
    marginLeft: '5px'
  },
  title: {
    color: Palette.PALE_GRAY,
    fontFamily: 'Fira Sans',
    fontSize: '15px',
    fontStyle: 'italic'
  }
}

class ElementTitle extends React.PureComponent {
  getElementTitle () {
    if (this.props.title) {
      return this.props.title
    } else {
      const title = get(this.props, 'element.staticTemplateNode.attributes.haiku-title')
      return title ? truncate(title, 16) : '(unknown)'
    }
  }

  render () {
    return (
      <div style={STYLES.wrapper}>
        <h3 style={STYLES.title}>{`${this.getElementTitle()} Actions`}</h3>
        {!this.props.hideActions &&
          <button style={STYLES.button} onClick={this.props.onNewAction}>
            <span>
              <EventsBoltIcon color={Palette.PALE_GRAY} />
            </span>
            <span style={STYLES.buttonText}>New Action</span>
          </button>
        }
      </div>
    )
  }
}

ElementTitle.propTypes = {
  element: React.PropTypes.object,
  onNewAction: React.PropTypes.func.isRequired
}

export default ElementTitle
