/**
 * @file Small tearsheet mocks.
 * @copyright IBM Security 2019
 */

const labels = {
  TEARSHEET_SMALL_PRIMARY_BUTTON: 'Action',
  TEARSHEET_SMALL_SECONDARY_BUTTON: 'Cancel',
  TEARSHEET_SMALL_CLOSE_BUTTON: 'Close',
};

const description =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.';
const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt. Nam at lectus urna duis convallis. Ipsum a arcu cursus vitae congue mauris. Porttitor leo a diam sollicitudin tempor id eu nisl nunc. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Interdum posuere lorem ipsum dolor. Enim ut sem viverra aliquet eget sit. Viverra maecenas accumsan lacus vel facilisis volutpat est velit. Tristique senectus et netus et malesuada fames ac turpis egestas. Nulla porttitor massa id neque aliquam vestibulum. In egestas erat imperdiet sed euismod nisi porta. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Feugiat in fermentum posuere urna nec tincidunt praesent. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Quis eleifend quam adipiscing vitae. Quis risus sed vulputate odio ut enim blandit. Duis ultricies lacus sed turpis tincidunt id. Dolor sit amet consectetur adipiscing elit. Posuere urna nec tincidunt praesent semper feugiat. Ultrices in iaculis nunc sed. Ornare lectus sit amet est placerat. Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Nibh sit amet commodo nulla facilisi nullam vehicula. Adipiscing diam donec adipiscing tristique risus. Faucibus nisl tincidunt eget nullam. Urna neque viverra justo nec ultrices dui sapien eget mi. Sodales ut etiam sit amet nisl purus in mollis nunc. Egestas congue quisque egestas diam in arcu cursus euismod. Id aliquet risus feugiat in. Magna fringilla urna porttitor rhoncus. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Tortor posuere ac ut consequat semper. In metus vulputate eu scelerisque felis imperdiet proin. Ac felis donec et odio. Commodo nulla facilisi nullam vehicula ipsum a. Facilisis volutpat est velit egestas dui id ornare arcu. Ipsum dolor sit amet consectetur adipiscing elit ut. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Dui id ornare arcu odio ut sem nulla pharetra. Elit ut aliquam purus sit amet luctus venenatis lectus magna. Semper auctor neque vitae tempus quam pellentesque. Sed turpis tincidunt id aliquet risus feugiat. Lacinia at quis risus sed vulputate odio ut enim blandit. Commodo ullamcorper a lacus vestibulum. Amet risus nullam eget felis eget nunc lobortis mattis. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Vulputate dignissim suspendisse in est. Eget magna fermentum iaculis eu non. Massa tincidunt dui ut ornare lectus sit amet est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Morbi non arcu risus quis varius. Sit amet est placerat in egestas erat imperdiet sed. Morbi tincidunt ornare massa eget egestas purus viverra. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Fusce ut placerat orci nulla pellentesque. Dui sapien eget mi proin sed libero enim sed. Nec ultrices dui sapien eget mi proin sed libero. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Fermentum dui faucibus in ornare quam. Viverra accumsan in nisl nisi scelerisque. Ipsum suspendisse ultrices gravida dictum fusce ut. Posuere lorem ipsum dolor sit amet consectetur adipiscing. Ut faucibus pulvinar elementum integer enim. Nulla porttitor massa id neque aliquam. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Mauris cursus mattis molestie a iaculis at. Eu feugiat pretium nibh ipsum consequat nisl. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Sagittis nisl rhoncus mattis rhoncus urna neque. Ullamcorper morbi tincidunt ornare massa eget. Faucibus turpis in eu mi bibendum neque egestas congue. Arcu non odio euismod lacinia at quis risus sed.';
const heading = 'Title';

const isDisabled = false;

/**
 * Empty click handler.
 * @returns {object} An empty object.
 */
const onClick = () => ({});

const buttons = {
  primaryButton: {
    isDisabled,
    onClick,
  },
  secondaryButton: {
    isDisabled,
    onClick,
  },
  closeButton: {
    isDisabled,
    onClick,
  },
};

const disabledButtons = {};

Object.keys(buttons).forEach((button) => {
  disabledButtons[button] = {
    isDisabled: !isDisabled,
    onClick,
  };
});

export {
  buttons,
  description,
  body,
  disabledButtons,
  heading,
  isDisabled,
  onClick,
  labels,
};
