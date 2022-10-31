import React, { PureComponent } from 'react'
import Icon from '@myntra/uikit-component-icon'

import classnames from './quick-link.module.scss'

export interface LinkInterface {
  icon: Node
  renderFunction: Function
}

export interface QuickLinkProps extends BaseProps {
  link: LinkInterface
}

interface QuickLinkState {
  quickLinkHover: boolean
}

/**
 * <Component description goes here>
 *
 * @since 1.13.101
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/top-nav
 */

export default class QuickLink extends PureComponent<
  QuickLinkProps,
  QuickLinkState
> {
  constructor(props) {
    super(props)
    this.state = {
      quickLinkHover: false,
    }
  }

  overlayButtonRef = null

  enableQuickLinkHover = () => this.setState({ quickLinkHover: true })

  disableQuickLinkHover = () => this.setState({ quickLinkHover: false })

  render() {
    const { link } = this.props
    return (
      <div className={classnames('quick-link')}>
        <button
          ref={(ref) => {
            this.overlayButtonRef = ref
          }}
          onClick={this.enableQuickLinkHover}
          className={classnames(
            'quick-link-icon-button',
            this.state.quickLinkHover ? 'quick-link-icon-button-active' : null
          )}
        >
          <Icon name={link.icon} fontSize="small" />
        </button>
        {this.state.quickLinkHover && (
          <div
            className={classnames('quick-link-hover-container')}
            style={{
              top: `${this.overlayButtonRef.getBoundingClientRect().bottom}px`,
              right: `${window.innerWidth -
                this.overlayButtonRef.getBoundingClientRect().right}px`,
            }}
          >
            {link.renderFunction({
              enableQuickLinkHover: this.enableQuickLinkHover,
              disableQuickLinkHover: this.disableQuickLinkHover,
            })}
          </div>
        )}
        {this.state.quickLinkHover && (
          <button
            onClick={this.disableQuickLinkHover}
            className={classnames('quick-link-overlay')}
          >
            <span className={classnames('quick-link-overlay-section')}></span>
          </button>
        )}
      </div>
    )
  }
}
