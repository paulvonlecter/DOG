<?php
$buffer = file_get_contents($_GET['q'])
$buffer = str_replace('href="/overlay/', 'href="https://streamkit.discord.com/overlay/', $buffer);
$buffer = str_replace('src="/overlay/', 'src="https://streamkit.discord.com/overlay/', $buffer);
echo $buffer;
