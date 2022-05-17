import PropTypes from 'prop-types'


function Card({children, reverse}) {
  var rev = ''

  if(reverse){
    rev = 'reverse'
  }else{
    rev = ''
  }

  return (
    <div className={'card ' + rev}>
        {children}
    </div>
  )
}

Card.defaultProps = {
  reverse: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
}

export default Card