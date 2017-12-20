import React from 'react'
import truncate from 'haiku-ui-common/lib/helpers/truncate'
import Palette from 'haiku-ui-common/lib/Palette'
import {ComponentIconSVG} from 'haiku-ui-common/lib/react/OtherIcons'
import Color from 'color'

export default class ComponentHeadingRowHeading extends React.Component {
  constructor (props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentWillUnmount () {
    this.mounted = false
    this.props.row.removeListener('update', this.handleUpdate)
  }

  componentDidMount () {
    this.mounted = true
    this.props.row.on('update', this.handleUpdate)
  }

  handleUpdate (what) {
    if (!this.mounted) return null
    if (
      what === 'row-selected' ||
      what === 'row-expanded' ||
      what === 'row-collapsed' ||
      what === 'row-deselected' ||
      what === 'row-hovered' ||
      what === 'row-unhovered'
    ) {
      this.forceUpdate()
    }
  }

  render () {
    let color = Palette.ROCK_MUTED

    if (this.props.row.isExpanded()) {
      color = Palette.ROCK
    }

    if (this.props.row.isSelected()) {
      color = Palette.SUNSTONE
    }

    if (this.props.row.isHovered()) {
      color = Color(color).lighten(0.25)
    }

    const elementName = this.props.row.element.getNameString()

    return (
      (this.props.row.isRootRow())
        ? (<div style={{height: 27, display: 'inline-block', transform: 'translateY(1px)'}}>
          {truncate(this.props.row.element.getTitle() || elementName, 12)}
        </div>)
        : (<span className='no-select'>
          <span
            style={{
              display: 'inline-block',
              fontSize: 21,
              position: 'relative',
              zIndex: 1005,
              verticalAlign: 'middle',
              color: Palette.GRAY_FIT1,
              marginRight: 7,
              marginTop: 1
            }}>
            <span style={{
              marginLeft: 5,
              backgroundColor: Palette.GRAY_FIT1,
              position: 'absolute',
              width: 1,
              height: 25
            }} />
            <span style={{marginLeft: 4}}>—</span>
          </span>
          <span
            style={{
              color,
              position: 'relative',
              zIndex: 1005,
              display: 'inline-block',
              width: 145,
              height: 20
            }}>
            <span
              style={{
                position: 'absolute',
                display: 'inline-block',
                height: 20,
                left: 0,
                top: 8
              }}>
              {(this.props.row.element.isComponent())
                ? <ComponentIconSVG />
                : ''}
            </span>
            <span
              style={{
                position: 'absolute',
                display: 'inline-block',
                height: 20,
                left: (this.props.row.element.isComponent())
                  ? 20
                  : 0,
                top: 7
              }}>
              {truncate(this.props.row.element.getTitle() || `<${elementName}>`, 8)}
            </span>
          </span>
        </span>)
    )
  }
}

ComponentHeadingRowHeading.propTypes = {
  row: React.PropTypes.object.isRequired,
  $update: React.PropTypes.object.isRequired
}
