function clickWave(css_class,waveSize, unit, duration, color, timeFunction) {

  css_class = css_class || '.btn';
  waveSize = waveSize || '150';
  unit = unit || '%';
  duration = duration || 3500;
  color = color || 'rgba(255,255,255,0.33)';
  timeFunction = timeFunction || 'cubic-bezier(.09, .84, .29, 1.03)';

  if ( css_class == 'body' || css_class == 'html'  ) {
    var wave_pos = 'absolute';
  } else {
    wave_pos = 'absolute';
  }

  var cs_clickWave_css = `
<style> 
.click-wave {
  position: `+wave_pos+`;
  width: 0;
  height: 0;
  padding-top:0;
  border-radius: 50%;
  animation: click-scale ` + duration / 1000 + `s 1 ` + timeFunction + `;
  opacity: 1;
  background-color: ` + color + `;
  z-index: 999;
  0 0px 75px 125px rgba(255, 255, 255, 0.23) inset
}

@keyframes click-scale {
to {
  width: ` + waveSize + unit + `;
  padding-top: ` + waveSize + unit + `;
  margin-left: -` + waveSize / 2 + unit + `;
  margin-top: -` + waveSize / 2 + unit + `;
  opacity: 0;
  }
}
</style>
`;

  $(document).ready(function() {
    var click_calc = 0;
    $('head').append(cs_clickWave_css);
    $(css_class).on('mousedown', function (e) {
      const click_offset = $(this).offset();
      const scrollTop = $(this).scrollTop();


      if ( css_class != 'body' & css_class != 'html'  ) { 
        $(this).css({'position':'relative','overflow':'hidden'});
        var click_offset_X = e.pageX - $(this).offset().left;
        var click_offset_Y = e.pageY - $(this).offset().top;

      } else {
        $(this).css({'position':'relative','overflow-x':'hidden','min-height':'100vh'});
        var click_offset_X = (e.clientX - click_offset.left);
        var click_offset_Y = (e.clientY - click_offset.top);
        click_offset_Y = click_offset_Y + scrollTop;
      }


      click_calc++;
      var click_remove = click_calc;
      $(this).append('<div _wave="' + click_calc + '" style="left: ' + click_offset_X + 'px;top:' + click_offset_Y + 'px;" class="click-wave"></div>');


      setTimeout(function () {
        $('.click-wave[_wave=' + click_remove + ']').remove();
      }, duration);
    });
  });
}

