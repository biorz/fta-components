import { Form } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import '../../style/components/form/index.scss'
import { FormProps } from '../../types/form'

export default class FTAForm extends React.Component<FormProps> {
  public static defaultProps: FormProps
  public static propTypes: InferProps<FormProps>

  private onSubmit(): void {
    this.props.onSubmit && this.props.onSubmit(arguments as any)
  }

  private onReset(): void {
    this.props.onReset && this.props.onReset(arguments as any)
  }

  public render(): JSX.Element {
    const { customStyle, className, reportSubmit, children } = this.props
    const rootCls = classNames('fta-form', className)

    return (
      <Form
        className={rootCls}
        style={customStyle}
        onSubmit={this.onSubmit.bind(this)}
        reportSubmit={reportSubmit}
        onReset={this.onReset.bind(this)}>
        {children}
      </Form>
    )
  }
}

Form.defaultProps = {
  // customStyle: null,
  className: '',
  reportSubmit: false,
}

Form.propTypes = {
  // customStyle: PropTypes.object,
  className: PropTypes.string,
  reportSubmit: PropTypes.bool,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
}
