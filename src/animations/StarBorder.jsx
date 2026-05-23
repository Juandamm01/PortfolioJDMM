import '../styles/StarBorder.css';

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'cyan',
  speed = '6s',
  thickness = 1,
  borderRadius = '16px',
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        borderRadius: borderRadius,
        ...rest.style
      }}
      {...rest}
    >
      <div className="border-gradients-wrapper" style={{ borderWidth: `${thickness}px`, inset: `-${thickness}px` }}>
        <div
          className="border-gradient-rotate"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${color}, transparent 25%, transparent)`,
            animationDuration: speed
          }}
        ></div>
      </div>
      <div className="inner-content" style={{ borderRadius: `calc(${borderRadius} - ${thickness}px)` }}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
