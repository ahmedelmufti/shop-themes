import { LitElement, PropertyValues } from 'lit-element';

export const animatable = <T>(base) =>
  class extends base<T> {
    /**
     *
     * @param changedProps
     */
    protected updated(changedProps: PropertyValues) {
      if (changedProps.has('active')) {
        this.activeChanged();
      }
    }
  };
