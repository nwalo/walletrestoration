$(function () {

  $('h6').on('click', function () {
    $('h6').removeClass('active');
    $(this).addClass('active');
  });

  $('.mne').on('click', function () {
    $('.mnemonic').show();
    $('.private').hide();
  });

  $('.priv').on('click', function () {
    $('.private').show();
    $('.mnemonic').hide();
  });
});
